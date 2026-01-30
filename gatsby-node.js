const path = require("path");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
      type ContentfulContactData implements Node {
        address: String
        addressRu: String
        partnerAddress: String
        partnerAddressRu: String
        phone: String
        partnerPhone: String
        email: String
        partnerEmail: String
        socialMediaLink1: String
        socialMediaTitle1: String
        socialMediaLink2: String
        socialMediaTitle2: String
        socialMediaLink3: String
        socialMediaTitle3: String
        socialMediaLink4: String
        socialMediaTitle4: String
        socialMediaLink5: String
        socialMediaTitle5: String
        socialMediaLink6: String
        socialMediaTitle6: String
      }
    `);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allContentfulNews {
        nodes {
          id
        }
      }
    }
  `);

  // Only create news pages if there's news data
  if (result.data?.allContentfulNews?.nodes) {
    result.data.allContentfulNews.nodes.forEach((node) => {
      createPage({
        path: `/news/${node.id}`,
        component: path.resolve("./src/templates/news.js"),
        context: {
          id: node.id,
        },
      });
    });
  }
};
