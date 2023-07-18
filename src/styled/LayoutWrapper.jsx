import { styled } from "styled-components";

const LayoutWrapper = styled.div`
  .ant-layout-content {
    padding: 0 30px 30px;
    background-color: white;
    margin: 30px;
    border-radius: 10px;
  }
  .ant-layout-header {
    background-color: white;
  }
  .ant-layout-sider {
    overflow-y: scroll;
    height: 100vh;
    background-color: white;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
  }

  li.ant-menu-item {
    font-size: 18px;
    padding: 32px;
  }
  .ant-menu-item-selected {
    font-weight: bold;
  }

  .ant-menu-item-icon.anticon {
    font-size: 20px;
  }
`;

export default LayoutWrapper;
