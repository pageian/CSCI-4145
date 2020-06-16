
module.exports.routes = {
  '/':                                            { view: 'pages/homepage' },
  'GET /getAll023':                             'LabController.getAll023',
  'GET /getRecordByIds023/:JobId023/PartId023':   'LabController.getRecordByIds023',
  'POST /addRecord023':                               'LabController.addRecord023',
  'GET /viewData023':                                'LabController.viewData023',
  'GET /addData023':                                 { view: 'pages/addData'},
  'POST /addData023':                                'LabController.addData023'
};
