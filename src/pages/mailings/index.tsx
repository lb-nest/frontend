import { Container } from '@mui/material';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MailingsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          overflow: 'auto',
        }}>
        <Calendar
          localizer={localizer}
          selectable
          events={[
            {
              start: new Date(),
              end: new Date(),
              title: 'Welcome',
            },
          ]}
          onSelectSlot={(data) => {
            console.log('slot', data);
          }}
          onSelectEvent={(data) => {
            console.log('event', data);
          }}
          startAccessor='start'
          endAccessor='end'
        />
      </Container>
    </GuardWrapper>
  );
};

MailingsPage.getLayout = (page) => <Layout i18n='common:pages.mailings'>{page}</Layout>;

export default MailingsPage;
