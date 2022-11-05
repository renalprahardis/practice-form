/// <reference types="Cypress" />

describe('Practice Form', () => {
  beforeEach(() => {
    cy.visitPage();
  });

  it('Check user submit with valid data', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      cy.submitData(data);
      cy.expSuccessSubmit();
    });
  });

  it('Check user submit with not fill all data', () => {
    cy.get('#submit').click();
    cy.expFailedSubmit();
  });

  it('Check user submit with not fill email', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      const caseField = "emailNull";
      cy.submitData(data, caseField);
      cy.expSuccessSubmit();
    });
  });

  it('Check user submit with not fill hobbies', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      const caseField = "hobbiesNull";
      cy.submitData(data, caseField);
      cy.expSuccessSubmit();
    });
  });

  it('Check user submit with not fill current address', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      const caseField = "currentAddresssNull";
      cy.submitData(data, caseField);
      cy.expSuccessSubmit();
    });
  });

  it('Check user submit with not fill state & city', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      const caseField = "stateCityNull";
      cy.submitData(data, caseField);
      cy.expSuccessSubmit();
    });
  });


  it('Check user submit with invalid email', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.email = 'renaltest@mailinator'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expFailedSubmit();
      cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      }).then((data) => {
        data.email = 'renaltest@mailinator.com'
        cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      });
    });
  });

  it('Check user submit with enter alphabet on mobile', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.mobile = 'abcdefg'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expFailedSubmit();
      cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      }).then((data) => {
        data.mobile = '0812223334'
        cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      });
    });
  });


  it('Check user submit with enter phone number < 10 digit', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.mobile = '0812223'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expSuccessSubmit();
      cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      }).then((data) => {
        data.mobile = '0812223334'
        cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      });
    });
  });

  it('Check user submit with input subject outside the list ', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.subject = 'Testing'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expSuccessSubmit();
      cy.contains('Testing').should('not.exist');
      cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      }).then((data) => {
        data.subject = 'Computer Science'
        cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      });
    });
  });

  it('Check user submit with upload file image with size > 10 mb', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.picture = '/file/file-jpg>10mb.jpg'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expSuccessSubmit();
      cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      }).then((data) => {
        data.picture = '/file/file-jpg=10mb.jpg'
        cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      });
    });
  });

  it('Check user submit with upload file image with size < 10 mb', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.picture = '/file/file-jpg<10mb.jpg'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expSuccessSubmit();
      cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      }).then((data) => {
        data.picture = '/file/file-jpg=10mb.jpg'
        cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      });
    });
  });

  it('Check user submit with upload file image with size = 10 mb', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.picture = '/file/file-jpg=10mb.jpg'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expSuccessSubmit();
    });
  });

  it('Check user submit with upload file pdf on picture field', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.picture = '/file/file-pdf.pdf'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expSuccessSubmit();
      cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      }).then((data) => {
        data.picture = '/file/file-jpg=10mb.jpg'
        cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      });
    });
  });

  it('Check user submit with upload file csv on picture field', () => {
    cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
      if (err) {
        return console.error(err);
      };
    }).then((data) => {
      data.picture = '/file/file-csv.csv'
      cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      cy.submitData(data);
      cy.expSuccessSubmit();
      cy.readFile("cypress/fixtures/user/data_user.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      }).then((data) => {
        data.picture = '/file/file-jpg=10mb.jpg'
        cy.writeFile("cypress/fixtures/user/data_user.json", JSON.stringify(data));
      });
    });
  });

});