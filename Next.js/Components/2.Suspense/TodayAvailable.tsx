import { FC } from 'react';

import { Box, Container, Flex, Title } from '@mantine/core';

import CategoriesTab from '@/components/material/tabs/CategoriesTab/Categories.tab';
import LandingServicesList from '@/components/material/lists/LandingServices/LandingServices.list';
import ServicesPortal from '../Portals/Services.portal';

import {
  getCategories,
  getTodayAvailableServices,
} from '@/data/server_requests/landing_page/landing';

import styles from './LandingTodayAvailableSection.module.css';

export interface LandingTodayAvailableSectionProps {
  categorySearchParam?: string;
}

const LandingTodayAvailableSection: FC<LandingTodayAvailableSectionProps> = async ({
  categorySearchParam,
}) => {
  const [categories, services] = await Promise.all([
    getCategories(false),
    getTodayAvailableServices(categorySearchParam),
  ]);

  return (
    <Box
      component="section"
      style={{ background: 'var(--mantine-color-black)' }}
      py={{ base: 24, md: 80 }}
    >
      <Container>
        <Box>
          <Title order={2} fz={{ md: 36, base: 20 }} className={styles.title}>
            Available Booking For Today
          </Title>
          <Title
            order={2}
            fz={{ md: 20, base: 16 }}
            my={{ base: 0, md: 8 }}
            className={styles.subtitle}
          >
            You can book the nearest time!
          </Title>
        </Box>

        <Flex direction="column" gap="sm">
          <CategoriesTab
            tabs={categories}
            tabsProps={{
              defaultValue: 'All',
              classNames: { panel: styles.panel },
            }}
          />

          <LandingServicesList services={services.data} />
        </Flex>

        <ServicesPortal />
      </Container>
    </Box>
  );
};
export default LandingTodayAvailableSection;
