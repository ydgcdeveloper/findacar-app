import { gql } from 'apollo-angular';

export const queries = {
  getUsers: () => gql`
    query getUsers {
      getUsers{
        id
        email
        username
      }
    }
  `
  ,
  getPathologiesAndTypes: () => gql`
    query getPathologiesAndTypes {
      pathologyTypes {
        collection {
          id
          name
          pathologies {
            collection {
              id
              name
            }
          }
        }
      }
    }
  `,
  getUserById: () => gql`
    query getUserById($id: Int!){
      getUserById(id: $id){
        id
        email
        username
        role
        profile{
          firstName
          lastName
          gender
          phone
          dateOfBirth
          filter
        }
      }
    }
  `,
  getDiagnosedPathologies: () => gql`
    query getDiagnosedPathologies(
    $itemsPerPage: Int,
    $page: Int,
    $patient_id: Int!,
    $patient_id_list: [Int],
    $order: [DiagnosedPathologyFilter_order]) {
      diagnosedPathologies(page: $page,
      itemsPerPage: $itemsPerPage,
      patient_id: $patient_id,
      patient_id_list: $patient_id_list,
      order: $order) {
        collection {
          id
          year
          pathology
        }
      }
    }
  `,
  getPatient: () => gql`
    query getPatient($id:ID!) {
      patient(id: $id) {
        id
        height
        weight
        bloodPressureSystolic
        bloodPressureDiastolic
        abdominalCircumference
        physicalActivityLevel
        weeklyExercisedDays,
        sleepHours
        isSmoker
        mood
        triglycerides
        hdl
        cholesterol
        hasHypercholesterolemia
        hasDiagnosedPathology
        diagnosedDiseases {
          collection {
            id
            year
            pathology
          }
        }
        username
        email
        name
        birthdate
        lastname
        zipCode
        gender
        dni
        mobile
      }
    }
  `
};
