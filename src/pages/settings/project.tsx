import { useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { Container, Fab, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SettingsLayout, Team } from '../../components/settings';
import { PROJECT_USERS } from '../../core/api';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ProjectSettingsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const { t } = useTranslation();

  const projectUsers = useQuery(PROJECT_USERS);

  return (
    <GuardWrapper>
      <Container maxWidth='sm'>
        <Typography variant='subtitle1' textAlign='center'>
          {t<string>('settings:pages.project.team')}
        </Typography>
        {projectUsers.data && <Team users={projectUsers.data.projectUsers} />}
      </Container>
      <Fab
        color='primary'
        sx={{
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}>
        <Add />
      </Fab>
    </GuardWrapper>
  );
};

ProjectSettingsPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default ProjectSettingsPage;
