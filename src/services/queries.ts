import {gql} from "graphql-request";

export const getCategories = gql`
   query {
     categories {
       name
     }
   }
`;
export const getCurrency = gql`
    query {
          currencies {
            symbol
            label
          }
        }
`;

export const getProductsCategoriesBySlug = gql`
      query Query($input: CategoryInput) {
          category(input: $input) {
            name
            products {
              id
              name
              gallery
              brand
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              prices {
                currency {
                  symbol
                  label
                }
                amount
              }
              inStock
            }
          }
        }
`

export const getProductDetailsById = gql`
        query Query($productId: String!) {
           product(id: $productId) {
             name
             inStock
             gallery
             id
             description
             prices {
                amount
                currency {
                  symbol
                  label
                }
             }
             brand
             attributes {
               name
               type
               id
               items {
                 displayValue
                 value
                 id
               }
             }
           }
        }
    `