const express = require('express');
const router = express.Router();

router.get('/todos', (req, res) => {
		connection.query('SELECT * FROM Todos', (err, data, fields) => {
			if (err) {
				res.json({
					success: false,
					err
				});
			}
			else {
				res.json({
					success: true,
					data
				});
			}
		})
	})


router.post('/todos', (req, res) => {
    query = `
        -- INSERT INTO Todos(
        --        todo_content, 
        --        todo_done) 
        -- VALUES(?);
    `
    values = [
        req.body.content,
        req.body.done
    ]
    connection.query(query, [values], (err, data, fields) => {
        if (err) {
            res.json({
                success: false,
                err
            });
        }
        else {
            res.json({
                success: true,
                data
            });
        }
    })
})

module.exports = router;