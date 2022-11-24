import styled from 'styled-components';

import { color, font } from 'react-project-management';
import { Button } from 'components';

export const TypeButton = styled(Button)`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${color.textMedium};
  ${font.size(13)}
`;

export const Type = styled.div`
  display: flex;
  align-items: center;
`;

export const TypeLabel = styled.div`
  padding: 0 5px 0 7px;
  ${font.size(15)}
`;
