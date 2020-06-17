
module.exports.routes = {
  '/':                                            { view: 'pages/homepage' },
  'GET /getAll023':                             'JobController.getAll023',
  'GET /getJobByIds023/:JobId023/PartId023':   'JobController.getJobByIds023',
  'POST /addJob023':                               'JobController.addJob023',
  'GET /viewData023':                                'JobController.viewData023',
  'GET /addData023':                                 { view: 'pages/addData'},
  'POST /addData023':                                'JobController.addData023'
};
