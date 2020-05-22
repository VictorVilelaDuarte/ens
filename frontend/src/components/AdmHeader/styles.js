import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  height: 70px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  align-items: center;
`;

export const Image = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #777;
`;

export const Name = styled.text`
  margin-left: 10px;
  color: #555;
  font-size: 18px;
`;

export const Exit = styled.button`
  height: 50px;
  width: 130px;
  color: #fff;
  background-color: #f54b30;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
`;
