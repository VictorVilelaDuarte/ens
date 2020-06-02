import bd from '../../config/database';

class InformensController {
  async lista(req, res) {
    let { page } = req.query;
    let offset = 0;
    let numberOfPages = 0;
    page = parseInt(page);
    if (!page) {
      page = 1;
    }

    bd.query('SELECT COUNT (*) as total from ens_informens', (err, result) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: 'Não foi possivel buscar os informens.',
        });
      }
      const reminder = result[0].total % 10;
      if (reminder) {
        numberOfPages = parseInt(result[0].total / 10) + 1;
      } else {
        numberOfPages = result[0].total / 10;
      }
      if (page < 1) {
        page = 1;
      }
      if (page > numberOfPages) {
        page = numberOfPages;
      }

      if (page > 1) {
        offset = (page - 1) * 10;
      }

      bd.query(
        `SELECT * FROM ens_informens ORDER BY informens_data DESC LIMIT 10 OFFSET ${offset} `,
        (error, results) => {
          if (error) {
            return res.status(400).json({
              staus: false,
              message: 'Não foi possível buscar os informens.',
            });
          }
          return res
            .status(200)
            .header({
              prevPage: page <= 1 ? page : page - 1,
              page,
              nextPage: numberOfPages > page ? page + 1 : page,
              lastPage: numberOfPages,
            })
            .json({
              status: true,
              data: results,
            });
        }
      );
    });
  }

  insere(req, res) {
    const { titulo, data } = req.body;
    const { filename: path } = req.file;
    const final_path = `${process.env.APP_URL}/files-informens/${path}`;

    bd.query(
      `INSERT INTO ens_informens (Informens_Titulo, Informens_Path, Informens_Data)
         VALUES ('${titulo}','${final_path}', '${data}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível o informens.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Informens adicionado com sucesso!',
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(
      `DELETE FROM ens_informens WHERE Informens_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir o informens.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Informens deletado com sucesso!',
        });
      }
    );
  }
}

export default new InformensController();
