import styled, { keyframes } from "styled-components";

const Skeleton = () => {
  return (
    <SkeletonContainer>
      <PictureSkeleton />
      <SkeletonWrap>
        <ProductSkeleton height="48px" marginBottom="16px" />
        <ProductSkeleton height="24px" marginBottom="8px" />
        <ProductSkeleton height="20px" marginBottom="16px" />
        <ProductSkeleton height="24px" marginBottom="8px" />
        <ProductSkeleton height="20px" marginBottom="16px" />
        <ProductSkeleton height="24px" marginBottom="8px" />
        <ProductSkeleton height="20px" marginBottom="0" />
      </SkeletonWrap>
    </SkeletonContainer>
  );
};

export default Skeleton;

const loading = keyframes`
0% {
    background-position: -200px 0;
}

100% {
    background-position: calc(200px + 100%) 0;
}
`;

const SkeletonContainer = styled.div`
  position: relative;
  width: 960px;
  margin: 0 auto;
  padding-top: 3rem;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

const SkeletonWrap = styled.div`
  width: 50%;
`;

const ProductSkeleton = styled.div`
  display: block;
  height: ${(props) => props.height || "14px"};
  width: ${(props) => props.width || "100%"};
  animation: ${loading} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: 8px;
  margin-bottom: ${(props) => props.marginBottom || "0"};
`;

const PictureSkeleton = styled(ProductSkeleton)`
  width: 380px;
  height: 600px;
  margin: auto;
  display: block;
`;