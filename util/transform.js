const { exec } = require('child_process')

module.exports = (filePath, outdir) => {
  console.log('filePath, outdir  ', filePath, outdir)
	return new Promise((resolve, reject) => {
		exec('soffice --headless --convert-to pdf --outdir ' + outdir + ' ' + filePath, (err, stdout, stderr) => {
			if (stdout) return resolve(stdout)
      reject(err || stderr)
		})
	})
}