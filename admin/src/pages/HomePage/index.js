/*
 *
 * HomePage
 *
 */

import React from 'react';

import {
  EmptyStateLayout,
  BaseHeaderLayout,
  ContentLayout,
} from '@strapi/design-system';
import Illo from '../../components/illo';

const HomePage = () => {
  return (
    <>
      <BaseHeaderLayout
        title="Analytics"
        subtitle="This module is designed to track analytics within your application, allowing you to gain valuable insights into user interactions. It captures various key parameters for each event, ensuring detailed analysis"
        as="h2"
      />
      <ContentLayout>
        <EmptyStateLayout
          icon={<Illo />}
          content="Coming Soon"
        />
      </ContentLayout>
    </>
  );
};

export default HomePage;
