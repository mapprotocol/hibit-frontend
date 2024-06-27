import { Notifications } from '@mantine/notifications';
import { useNotification } from './style';

export default function NotificationsProvider() {
  const { classes } = useNotification();

  return <Notifications  styles={classes.notification} position="top-right"  zIndex={1000} top={100} mah={9999}/>;
}