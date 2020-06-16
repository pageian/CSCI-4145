module.exports.routes = {
  '/':                      { view: 'pages/homepage' },
  'GET /getParts':          'LabController.getParts',
  'GET /getPartsByID/:id':  'LabController.getPartsByID',
  'POST /addParts':         'LabController.addParts',
  'GET /viewData':          'LabController.viewData',
  'GET /addData':           { view: 'pages/addData'},
  'POST /addData':          'LabController.addData'
};
