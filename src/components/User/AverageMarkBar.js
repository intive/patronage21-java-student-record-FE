import { AVG_MARK_TITLE } from "../../config/Constants";
import styled from "styled-components";
import { getAvgMark } from "../../state/selectors";
import { useRecoilValue } from "recoil";
import { MAX_MARK } from "../../config/Constants";

export const Title = styled.span`
  flex: 1;
`;

const Bar = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  height: 60px;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  align-items: center;
  font-weight: 600;
  padding: 0 20px;
`;

function AverageMarkBar() {
  const avgMark = useRecoilValue(getAvgMark);
  return (
    <Bar>
      <Title>{AVG_MARK_TITLE}</Title>
      {`${avgMark}/${MAX_MARK}`}
    </Bar>
  );
}

export default AverageMarkBar;
