import { InputDebounced,Avatar}  from 'components';
import styled from 'styled-components';
import {color,font} from 'react-project-management'

export const SearchInput = styled(InputDebounced)`
  margin-right: 18px;
  width: 160px;
`;
export const Type = styled.div`
  display: flex;
  align-items: center;
`;
export const AssigneeAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;
export const Username = styled.div`
  display: inline-block;
  text-align:center;
  padding-right: 12px;
  color: ${color.textDark};
  ${font.medium}
`;
export const User = styled.div`
  display: flex;
  align-items: center;
`;
export const Table =styled.table`
/* &:tr td:first-child { width: 10px; } */
`
