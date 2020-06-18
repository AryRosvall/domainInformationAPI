# Get the servers information of a domain

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=appveyor)](https://github.com/facebook/react/blob/master/LICENSE) 

This API retrieves the servers information of a domain using different approaches.

It uses the next technologies:

- [SSL Labs API](https://api.ssllabs.com/api/v3/analyze) to analyze the information of a domain.

- [node-xwhois](https://www.npmjs.com/package/node-xwhois) to get the domain's owner and the country.

- [unfluff](https://www.npmjs.com/package/unfluff?activeTab=readme) to get the page title and the logo.


## The routes

This API has the following routes:

### http://localhost:8008/api/v1/domains/

This route returns all the domains that were searched before.

### http://localhost:8008/api/v1/domains/:domain

This route returns the information of the specific domain.

## Next steps

- Add authentication to get the user's past searches
- Add pagination

## Contributing
Feel free to contributing to this project sending your PR to [aryrosvall.com](https://github.com/AryRosvall/)

## About Me

[![aryrosvall](https://img.shields.io/badge/aryrosvall.com-blue?style=for-the-badge&logo=appveyor)](http://aryrosvall.com)
[![LinkedIn](https://img.shields.io/badge/Twitter-9cf?style=for-the-badge&logo=appveyor)](https://www.linkedin.com/in/arantxarosas/)
[![GitHub](https://img.shields.io/badge/GITHUB-green?style=for-the-badge&logo=appveyor)](https://github.com/AryRosvall)


