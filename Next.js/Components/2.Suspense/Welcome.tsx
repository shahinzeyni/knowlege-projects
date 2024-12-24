import Image from 'next/image';

import { Group, Text, Container } from '@mantine/core';

import LandingSectionButton from '@/components/material/buttons/LandingSectionButton/LandingSection.button';

import { getWelcome } from '@/data/server_requests/landing_page/landing';

import styles from './WelcomeSection.module.css';

const WelcomeSection = async () => {
  const welcome = await getWelcome();

  return (
    <section data-testid="welcome" className={styles.root}>
      <Container data-testid="welcome-container">
        <div data-testid="inner-div" className={styles.group}>
          <Group data-testid="left-box" className={styles.leftBox}>
            <Text data-testid="title" className={styles.title}>
              Welcome to <br /> Denise Beauty & <br /> Skincare
            </Text>
            <Text data-testid="description" className={styles.description}>
              {welcome.find((item) => item.attributeKey === 'Welcome Text')?.attributeValue}
            </Text>
            <LandingSectionButton data-testid="button">Our story</LandingSectionButton>
          </Group>
          <Group className={styles.rightBox}>
            <Image
              src="/assets/images/welcome-section/iStock-1022850042 1.jpg"
              width={303}
              height={303}
              alt="Barbers"
              className={styles.firstImg}
              loading="lazy"
            />
            <div className={styles.circle}></div>
            <Image
              src="/assets/images/welcome-section/Rectangle 39435 2.jpg"
              width={258}
              height={258}
              alt="Salon View"
              className={styles.middleImg}
              loading="lazy"
            />
            <div className={styles.circle1}></div>
            <Image
              src="/assets/images/welcome-section/Rectangle 39507.jpg"
              width={242}
              height={242}
              alt="Barber Shop View"
              className={styles.lastImg}
              loading="lazy"
            />
            <div className={styles.circle2}></div>
          </Group>
        </div>
      </Container>
    </section>
  );
};

export default WelcomeSection;
