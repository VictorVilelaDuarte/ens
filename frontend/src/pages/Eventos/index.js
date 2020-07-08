import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss';

import { Container } from './styles';

const localizer = momentLocalizer(moment);

export default function Eventos() {
  return (
    <Container>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        events={[
          {
            id: 0,
            title: 'Aniversario',
            allDay: true,
            start: '2020-09-23',
            end: '2020-09-23',
          },
        ]}
      />
    </Container>
  );
}
