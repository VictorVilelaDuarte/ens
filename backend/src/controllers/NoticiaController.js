import bd from '../../config/database';

class NoticiaController {
  lista(req, res) {
    bd.query('SELECT * FROM ens_noticia', (err, result) => {
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
    });
  }

  insere(req, res) {
    const autor = req.usuarioNome;
    const { filename: path } = req.file;
    const final_path = `${process.env.APP_URL}/files-noticia/${path}`;
    const { texto, titulo, destaque } = req.body;
    let hoje = new Date().toLocaleDateString();

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
    let hoje = new Date().toLocaleDateString();

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
