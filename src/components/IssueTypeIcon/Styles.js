import styled from 'styled-components';

import { issueTypeColors } from 'react-project-management';
import { Icon } from 'components';

export const TypeIcon = styled(Icon)`
  color: ${props => issueTypeColors[props.color]};
`;
