# Hyperschema.org

This is the source code for building the Hyperschema.org site. 

## Install

```bash
npm install
```

## Development Server

One thing that is included is a simple development server for the purpose of handing content negotiation. 

### Run

```bash
npm run server
```

## Contribute

If you'd like to contribute to this, please create a markdown file and a JSON file with the same name so they can be served as HTML or JSON. If there are extra files that go along with your page, make a directory with the same name as the original file with `_files` appended. See the HAL files in the `src/mediatypes` directory as an example.