'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import toast from 'react-hot-toast';
import { useAuth } from 'providers/AuthProvider';

const editableRoles = ['teacher', 'promo_admin', 'super_admin'];

export default function TimetableCalendar({ role }) {
  const queryClient = useQueryClient();
  const { authGet, authRequest } = useAuth();
  const [classCode, setClassCode] = useState('BCA-SEM1');

  const canEdit = editableRoles.includes(role);

  const timetableQuery = useQuery({
    queryKey: ['timetable', classCode],
    queryFn: async () => {
      const response = await authGet(`/timetable?classCode=${encodeURIComponent(classCode)}`);
      return response.events;
    },
    enabled: Boolean(classCode.trim())
  });

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      return authRequest('/timetable', {
        method: 'POST',
        body: payload
      });
    },
    onSuccess: () => {
      toast.success('Event created');
      queryClient.invalidateQueries({ queryKey: ['timetable', classCode] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create event');
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      return authRequest(`/timetable/${id}`, {
        method: 'PATCH',
        body: payload
      });
    },
    onSuccess: () => {
      toast.success('Event updated');
      queryClient.invalidateQueries({ queryKey: ['timetable', classCode] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update event');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return authRequest(`/timetable/${id}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      toast.success('Event deleted');
      queryClient.invalidateQueries({ queryKey: ['timetable', classCode] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete event');
    }
  });

  const events = useMemo(() => {
    return (timetableQuery.data || []).map((event) => ({
      id: event._id,
      title: event.room ? `${event.title} (${event.room})` : event.title,
      start: event.start,
      end: event.end,
      extendedProps: {
        rawTitle: event.title,
        room: event.room || ''
      }
    }));
  }, [timetableQuery.data]);

  const handleSelect = (selectionInfo) => {
    if (!canEdit) {
      toast.error('You do not have permission to edit the timetable.');
      selectionInfo.view.calendar.unselect();
      return;
    }

    const title = window.prompt('Enter subject/title');

    if (!title || !title.trim()) {
      selectionInfo.view.calendar.unselect();
      return;
    }

    const room = window.prompt('Enter room (optional)') || '';

    createMutation.mutate({
      title: title.trim(),
      room: room.trim(),
      classCode,
      start: selectionInfo.startStr,
      end: selectionInfo.endStr
    });
  };

  const handleEventChange = (changeInfo) => {
    if (!canEdit) {
      changeInfo.revert();
      toast.error('You do not have permission to edit the timetable.');
      return;
    }

    updateMutation.mutate(
      {
        id: changeInfo.event.id,
        payload: {
          start: changeInfo.event.start?.toISOString(),
          end: changeInfo.event.end?.toISOString()
        }
      },
      {
        onError: () => {
          changeInfo.revert();
        }
      }
    );
  };

  const handleEventClick = (clickInfo) => {
    if (!canEdit) {
      toast.error('You do not have permission to delete timetable events.');
      return;
    }

    const shouldDelete = window.confirm(
      `Delete "${clickInfo.event.extendedProps.rawTitle || clickInfo.event.title}"?`
    );

    if (shouldDelete) {
      deleteMutation.mutate(clickInfo.event.id);
    }
  };

  return (
    <section className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-6">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Timetable</h2>
          <p className="text-sm text-slate-600">
            {canEdit
              ? 'Drag/drop, resize, and select a slot to create events.'
              : 'Read-only timetable view.'}
          </p>
        </div>

        <div className="w-full md:w-64">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Class Code</label>
          <input
            type="text"
            value={classCode}
            onChange={(event) => setClassCode(event.target.value.toUpperCase())}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            placeholder="e.g. BCA-SEM1"
          />
        </div>
      </div>

      {timetableQuery.isLoading ? (
        <p className="text-sm text-slate-600">Loading timetable...</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="auto"
          editable={canEdit}
          selectable={canEdit}
          selectMirror={canEdit}
          eventDurationEditable={canEdit}
          eventStartEditable={canEdit}
          events={events}
          select={handleSelect}
          eventChange={handleEventChange}
          eventClick={handleEventClick}
        />
      )}
    </section>
  );
}
