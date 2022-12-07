import { DeleteOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Branch, ComparsionType, Variable } from '../../../types';
import { BranchData } from '../component';

interface BranchEditorProps extends BranchData {
  variables: Variable[];
  onChange: <T = any>(name: keyof BranchData, data: T) => void;
}

export const BranchEditor: React.FC<BranchEditorProps> = ({
  name,
  branches,
  variables,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Branch.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      <Box mt={4}>
        {branches.map((branch, i) => (
          <Paper
            key={i}
            sx={{
              p: 1,
              ':not(:first-of-type)': {
                mt: 1,
              },
            }}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography>
                {t<string>('chatbots:editor.nodes.Branch.branch', {
                  i,
                })}
              </Typography>
              <IconButton
                color='error'
                onClick={() => {
                  // TODO: delete unused edges
                  onChange<Branch[]>(
                    'branches',
                    branches.filter((_, j) => i !== j),
                  );
                }}>
                <DeleteOutlined />
              </IconButton>
            </Box>
            <Box>
              {t<string>('chatbots:editor.nodes.Branch.comparsion.start')}
              <ToggleButtonGroup
                size='small'
                sx={{
                  ml: 0.5,
                  mr: 0.5,
                }}
                color='primary'
                exclusive
                value={branch.type}
                onChange={(_, type: ComparsionType) => {
                  onChange<Branch[]>(
                    'branches',
                    branches.map((branch, j) => {
                      if (i === j) {
                        branch.type = type;
                      }

                      return branch;
                    }),
                  );
                }}>
                <ToggleButton value={ComparsionType.All}>
                  {t<string>('chatbots:editor.nodes.Branch.comparsionType.All')}
                </ToggleButton>
                <ToggleButton value={ComparsionType.Any}>
                  {t<string>('chatbots:editor.nodes.Branch.comparsionType.Any')}
                </ToggleButton>
              </ToggleButtonGroup>
              {t<string>('chatbots:editor.nodes.Branch.comparsion.end')}
            </Box>
          </Paper>
        ))}

        <Button
          fullWidth
          variant='outlined'
          sx={{
            mt: 2,
          }}
          onClick={() => {
            onChange<Branch[]>(
              'branches',
              branches.concat({
                type: ComparsionType.All,
                conditions: [],
              }),
            );
          }}>
          {t<string>('chatbots:editor.nodes.Branch.createBranch')}
        </Button>
      </Box>
    </>
  );
};
