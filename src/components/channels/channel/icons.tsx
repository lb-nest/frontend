import { Language, Telegram, WhatsApp } from '@mui/icons-material';
import { ChannelType } from '../../../core/types';

export const ICONS = {
  [ChannelType.Telegram]: <Telegram />,
  [ChannelType.Webchat]: <Language />,
  [ChannelType.Whatsapp]: <WhatsApp />,
};
