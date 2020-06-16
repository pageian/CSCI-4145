module.exports.routes = {
  '/':                      { view: 'pages/homepage' },
  'GET /getParts':          'LabController.getParts',
  'GET /getPartsByID/:id':  'LabController.getPartsByID',
  'POST /addParts':         'LabController.addParts',
};
