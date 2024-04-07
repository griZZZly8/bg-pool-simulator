import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`

export default ({ children } : PropsWithChildren) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}