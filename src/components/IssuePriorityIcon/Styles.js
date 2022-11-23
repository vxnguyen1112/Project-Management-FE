import styled from 'styled-components';

import { issuePriorityColors } from 'react-project-management';
import { Icon } from 'components';

export const PriorityIcon = styled(Icon)`
  color: ${props => issuePriorityColors[props.color]};
`;
