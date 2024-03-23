import { type SvgIconComponent } from '@mui/icons-material';

type Props = {
  color: string;
  height: number;
  icon: SvgIconComponent;
  width: number;
};

export const SvgIcon: React.FC<Props> = ({ color, height, icon: Icon, width }) => {
  // eslint-disable-next-line
  return <Icon style={{ color, height, width }} />;
};
