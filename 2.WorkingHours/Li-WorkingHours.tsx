'use client';

import { FC } from 'react';

import { Paper, Flex, useMantineTheme, Text } from '@mantine/core';
import styles from './WorkingHours.li.module.css';
import { WorkingHour } from '@/data/server_requests/landing_page/landing';

interface WorkingHoursListItemData {
  day: string;
  entries: WorkingHour[];
}

const WorkingHoursListItem: FC<WorkingHoursListItemData> = ({ day, entries }) => {
  const theme = useMantineTheme();

  const formatTime = (timeStr: string): string => {
    const [hour, minute] = timeStr.split(':');
    return `${hour}:${minute}`;
  };

  return (
    <Paper
      radius="50%"
      w={{ base: 155, xs: 160 }}
      h={{ base: 155, xs: 160 }}
      bg={theme.colors.primary[0]}
      c={theme.colors.primary[9]}
      aria-label="working-hours-item"
    >
      <Flex
        w="100%"
        h="80%"
        direction="column"
        align="center"
        justify="center"
        pt={entries.length > 1 ? '36' : '20'}
        aria-label="working-hours-body"
      >
        <Text className={styles.title} tt="uppercase">
          {day}
        </Text>
        <Flex direction="column" pb="2" pt="1">
          {entries.map((item) => (
            <Flex align="center" key={item.workingHoursId}>
              <Flex className={styles.openTime}>
                <Text className={styles.openTime}>{formatTime(item.openTime).slice(0, 2)}</Text>
                <Text className={styles.openTime} pl="1" pr="1">
                  {parseInt(formatTime(item.openTime).slice(0, 2), 10) < 12 &&
                  parseInt(formatTime(item.openTime).slice(0, 2), 10) > 0
                    ? 'AM'
                    : 'PM'}
                </Text>
                -
              </Flex>

              <Flex pt="0" className={styles.openTime}>
                <Text className={styles.openTime} pl="1" pr="1">
                  {formatTime(item.closeTime).slice(0, 2)}
                </Text>

                <Text className={styles.openTime} pl="1" pr="1">
                  {parseInt(formatTime(item.closeTime).slice(0, 2), 10) < 12 &&
                  parseInt(formatTime(item.closeTime).slice(0, 2), 10) > 0
                    ? 'AM'
                    : 'PM'}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Paper>
  );
};

export default WorkingHoursListItem;
