import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentMetrics, setMetrics, Metrics } from '../../modules/weather';
import Switcher from '../Switcher';

const SWITCHER_ITEMS = [
  {
    id: Metrics.Celsius,
    title: 'C',
  },
  {
    id: Metrics.Fahrenheit,
    title: 'F',
  },
];

const MetricsSwitcherDumb: React.FC = () => {
  const dispatch = useDispatch();
  const currentMetrics = useSelector(getCurrentMetrics);

  const onChangeMetrics = React.useCallback(
    (next: string) => {
      dispatch(setMetrics(next as Metrics));
    },
    [dispatch],
  );

  return (
    <Switcher
      items={SWITCHER_ITEMS}
      initialItemId={currentMetrics}
      onStateChange={onChangeMetrics}
    />
  );
};

const MetricsSwitcher = React.memo(MetricsSwitcherDumb);

export default MetricsSwitcher;
