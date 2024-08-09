import * as React from 'react';
import { ReactNode, useState } from 'react';

import { List } from 'react-native-paper';

interface Props {
  title: string;
  children: ReactNode;
}

const Accordion = ({ title, children }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion expanded={expanded} onPress={handlePress} title={title}>
      {children}
    </List.Accordion>
  );
};

export default Accordion;
