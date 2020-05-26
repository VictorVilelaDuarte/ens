import bd from '../../config/database';

class NoticiaController {
  async lista(req, res) {
    let { page } = req.query;
    let offset = 0;
    let numberOfPages = 0;
    page = parseInt(page);
    if (!page) {
      page = 1;
    }

    bd.query('SELECT COUNT (*) as total from ens_noticia', (err, result) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: 'Não foi possivel buscar as noticias.',
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
        `SELECT * FROM ens_noticia LIMIT 10 OFFSET ${offset}`,
        (error, results) => {
          if (error) {
            return res.status(400).json({
              staus: false,
              message: 'Não foi possível buscar as noticias.',
            });
          }
          return res
            .status(200)
            .header({
              prevPage: page <= 1 ? page : page - 1,
              page,
              nextPage: numberOfPages >= page ? page + 1 : page,
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
    const autor = req.usuarioNome;
    const { filename: path } = req.file;
    const final_path = `${process.env.APP_URL}/files-noticia/${path}`;
    const { texto, titulo, destaque } = req.body;
    const hoje = new Date().toLocaleDateString();

    bd.query(
      `INSERT INTO ens_noticia (noticia_autor, noticia_hora, noticia_texto, noticia_titulo, noticia_imagem, noticia_destaque) VALUES ('${autor}', '${hoje}', '${texto}', '${titulo}', '${final_path}', '${destaque}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a noticia.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Noticia registrada com sucesso!',
        });
      }
    );
  }

  altera(req, res) {
    const autor = req.usuarioNome;
    const { id } = req.params;
    const { texto, titulo, destaque } = req.body;
    const hoje = new Date().toLocaleDateString();

    bd.query(
      `UPDATE ens_noticia
       SET noticia_autor='${autor}', noticia_hora='${hoje}', noticia_texto='${texto}', noticia_titulo='${titulo}', noticia_destaque='${destaque}'
       WHERE noticia_cod='${id}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a noticia.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Noticia atualizada com sucesso!',
        });
      }
    );
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT * FROM ens_noticia WHERE noticia_cod=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar a noticia.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(
      `DELETE FROM ens_noticia WHERE noticia_cod=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir a noticia.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Noticia deletada com sucesso!',
        });
      }
    );
  }

  home(req, res) {
    bd.query(
      `SELECT * FROM ens_noticia WHERE noticia_destaque = 1`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar as noticias.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }
}

export default new NoticiaController();
