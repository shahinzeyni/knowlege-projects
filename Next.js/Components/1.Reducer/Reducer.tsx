'use client';

import { FC } from 'react';

import { Grid } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import LandingStaffCard from '../cards/LandingStaffCard/LandingStaff.card';

import ArrowRight1 from '../icons/ArrowRight1';
import ArrowLeft1 from '../icons/ArrowLeft1.icon';

import type { IStaff } from '@/data/server_requests/landing_page/landing';

import styles from './LandingStaff.carousel.module.css';

export interface LandingStaffCarouselProps {
  staffList: IStaff[];
}
const LandingStaffCarousel: FC<LandingStaffCarouselProps> = ({ staffList }) => {
  const staffsPerSlide = staffList.length <= 4 ? staffList.length : 4;
  const isSingle = staffList.length === 1;
  const isDouble = staffList.length === 2;

  return (
    <Carousel
      data-testid="grid-container"
      classNames={{ control: styles.carousel_control, viewport: styles.carousel_viewport }}
      className={styles.grid_container}
      slideSize="100%"
      slideGap="md"
      loop={false}
      align="start"
      slidesToScroll={1}
      nextControlIcon={staffList.length >= 5 ? <ArrowRight1 /> : null}
      previousControlIcon={staffList.length >= 5 ? <ArrowLeft1 /> : null}
      withControls={staffList.length >= 5}
      draggable={staffList.length >= 5}
    >
      {Array.isArray(staffList)
        ? staffList.reduce<JSX.Element[]>((acc, staff, index) => {
            if (index % staffsPerSlide === 0) {
              acc.push(
                <Carousel.Slide key={`slide-${index}`}>
                  <Grid
                    gutter={staffList.length === 2 ? 'xl' : 'xs'}
                    classNames={{ inner: styles.inner_col }}
                  >
                    {staffList.slice(index, index + staffsPerSlide).map((s, i) => (
                      <Grid.Col
                        classNames={{ col: styles.grid_col }}
                        key={`${index}-${i}`}
                        span={6}
                      >
                        <LandingStaffCard isDouble={isDouble} isSingle={isSingle} staff={s} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Carousel.Slide>
              );
            }
            return acc;
          }, [])
        : null}
    </Carousel>
  );
};

export default LandingStaffCarousel;
