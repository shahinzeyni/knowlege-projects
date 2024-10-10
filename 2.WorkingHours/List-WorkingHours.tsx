'use client';

import { FC } from 'react';
import { Flex } from '@mantine/core';

import WorkingHoursListItem from '../../lis/WorkingHours/WorkingHours.li';
import { PaginationWithDataType, WorkingHour } from '@/data/server_requests/landing_page/landing';
import { weekDaysName } from '@/data/static/app_wide/auth';

type WorkingHoursList = {
  data: WorkingHour[];
};

export interface WeekDaysNameProps {
  [key: number]: string;
}

const WorkingHoursList: FC<{ data: PaginationWithDataType<WorkingHour> }> = ({ data }) => {
  const getIndexDays = Object.keys(weekDaysName);

  const groupedHours: { [key: number]: WorkingHour[] } = data.reduce(
    (acc, entry) => {
      if (!acc[entry.dayOfWeek]) {
        acc[entry.dayOfWeek] = [];
      }
      acc[entry.dayOfWeek].push(entry);
      return acc;
    },
    {} as { [key: number]: WorkingHour[] }
  );

  return (
    <>
      <Flex py={40} justify="center" wrap="wrap" gap={{ base: 'sm', lg: 'xs' }}>
        {getIndexDays.map((itemDay) => {
          const day = parseInt(itemDay, 10);
          const entries = groupedHours[day] || [];

          return (
            <>
              <WorkingHoursListItem day={weekDaysName[day]} entries={entries} />
            </>
          );
        })}
      </Flex>
    </>
  );
};
export default WorkingHoursList;
