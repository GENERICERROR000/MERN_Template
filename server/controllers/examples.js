const Example = require('../models/Issue')

// TODO: Change to reflect model attributes


exports.updateExample = (req, res) => {
  const issueID = req.body.issueID,
    notes = req.body.updatedIssueParts.notes || null,
    status = req.body.updatedIssueParts.status || null,
    report = req.body.updatedIssueParts.report || null

  let updates = {}
  if (notes) updates.notes = notes
  if (status) updates.status = status
  if (report) updates.report = report

  Example.findByIdAndUpdate(issueID, updates, {new: true}, (err, updatedIssue) => {
    if (err) {
      return res.status(422).send({
        success: false,
        error: 'Something went wrong'
      })
    } else {
      res.send(updatedIssue)
    }}
  )
}

exports.deleteExample = (req, res) => {
  const issueID = req.headers['issue_id']

  Issue.findOneAndRemove(issueID, (err) => {
    if (err) {
      res.status(422).send({
        success: false,
        message: "Something went wrong"
      })
    }

    res.send({
      success: true,
      message: "Issue was successfully deleted"
    })
  })
}
