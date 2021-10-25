# graphql-federation-youtube-tutorial

This is the tutorial for GraphQL federation. you can find the video of this on https://youtu.be/cRoaE-qNiAU

## Guide to follow the repository

1. if you looking for exact project what I have done in the tutorial please reder 1.0 tag or graphql-federation-youtube-tutorial-completed branch

Master branch will update with Lint error fixes / code formatting / best practices etc. follow the commits.

### Tutorial Video

you can find step by step guide at https://youtu.be/cRoaE-qNiAU

for more tutorials subscribe to
https://youtube.com/krish

### if you want to share data across all services send those as x-shared-data header.

```bash
curl --request POST \
  --url http://localhost:4000/graphql \
  --header 'Content-Type: application/json' \
  --header 'x-shared-data: name=krish&city=Kadawatha&id=81' \
  --data '{"query":"query{\n  getAllEmployees{\n    firstName\n    project{\n      name\n      code\n    }\n    location{\n      name\n      employees{\nfirstName}\n    }\n  }\n}"}'
```
