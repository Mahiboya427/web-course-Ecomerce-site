SalesforceInteractions.init({
    cookieDomain : "mc654h8rl6ypfygmq-qvwq3yrjrq.pub.sfmc-content.com"     
  }).then(() => {
    console.log('debug');
  
    const { 
      cashDom,
      listener, 
      resolvers,
      sendEvent,
      util,
      CartInteractionName,
      CatalogObjectInteractionName,
      OrderInteractionName,
    } = SalesforceInteractions;
  
    const global = {
      listeners: [
        // capture email address when a user signs up
        listener('submit', '#myForm', (actionEvent) => {
          const emailAddress = cashDom("#email").val();
          console.log('emailAddress :',emailAddress);
          if (emailAddress) {
            sendEvent({ 
              interaction: {
                name: 'Email Sign Up'
              },
              user: {
                attributes: { 
                  email: emailAddress,
                  eventType: 'contactPointEmail' 
                }
              }
            })
            
          }
        })
      ],
      
    };
  
    const pageTypeDefault = {
      name: 'default'
    };
    
    SalesforceInteractions.initSitemap({
      global,
      pageTypeDefault,
      pageTypes: []
    });
  });