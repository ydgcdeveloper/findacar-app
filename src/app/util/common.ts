import { set, isAfter, isBefore } from 'date-fns';

export const getAvailability = (service): boolean => {
    const currentDate = new Date();
    const optionsDate: Intl.DateTimeFormatOptions = {
      weekday: 'short'
    };
    const locale = new Intl.Locale('en-US');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Days, Time } = JSON.parse(JSON.stringify(service.schedule));
    const initialTime = set(new Date(), {
      hours: (Time as string).split('-')[0].split(':')[0],
      minutes: (Time as string).split('-')[0].split(':')[1],
    });
    const finalTime = set(new Date(), {
      hours: (Time as string).split('-')[1].split(':')[0],
      minutes: (Time as string).split('-')[1].split(':')[1],
    });
    return (Days as [string]).includes(currentDate.toLocaleString(locale, optionsDate))
      && (isAfter(new Date(), initialTime) && isBefore(new Date(), finalTime));
  };
