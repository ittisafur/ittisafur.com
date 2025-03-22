import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation CreateContact($name: String!, $subject: String!, $email: String!, $message: String!) {
    createContact(
      data: {
        name: $name
        subject: $subject
        email: $email
        message: $message
      }
    ) {   
      email
      subject
      message
      name
    }
  }
`;
