import bd from '../../config/database';

class MensagemController {
  lista(req, res) {
    bd.query('SELECT COUNT (*) as total from ens_evento', (err, result) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: 'Não foi possivel buscar as noticias.',
        });
      }
    });
  }

  insere(req, res) {
    const { nome, assunto, conteudo, telefone, email } = req.body;
    bd.query(
      `INSERT INTO ens_mensagem (Mensagem_Nome, Mensagem_Assunto, Mensagem_Conteudo, Mensagem_Telefone, Mensagem_Email,
      Mensagem_Lida, Mensagem_Data)
       VALUES ('${nome}', '${assunto}', '${conteudo}', '${telefone}', '${email}', '0', NOW())`,
      (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível enviar a mensagem.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Mensagem enviada com sucesso!',
        });
      }
    );
  }

  altera(req, res) {
    const { id } = req.params;
    const {
      data,
      hora,
      local,
      equipe,
      descricao,
      historico,
      tipo,
      destaque,
    } = req.body;
    bd.query(
      `UPDATE ens_evento
       SET Evento_Data='${data}', Evento_Horario='${hora}', Evento_Local='${local}', Evento_TipoID='${tipo}', Evento_EquipeResp='${equipe}', Evento_Descricao='${descricao}', Evento_Historico='${historico}', Evento_Destaque='${destaque}'
       WHERE Evento_ID='${id}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o evento.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Evento atualizado com sucesso!',
        });
      }
    );
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT * FROM ens_evento WHERE Evento_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o evento.',
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
    bd.query(`DELETE FROM ens_evento WHERE Evento_ID=${id}`, (err, result) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível excluir o evento.',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Evento deletado com sucesso!',
      });
    });
  }

  home(req, res) {
    const hoje = new Date().toLocaleDateString();
    let mes = new Date();
    mes.setDate(mes.getDate() + 30);
    mes = mes.toLocaleDateString();

    bd.query(
      `SELECT * FROM ens_evento where Evento_Data BETWEEN '${hoje}' AND '${mes}' order by Evento_Data`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar os eventos.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  filtro(req, res) {
    const { mes } = req.body;
    const ano = new Date().getFullYear().toString();
    const data_inicial = `${ano}-${mes}-01`;
    const data_final = `${ano}-${mes}-31`;

    bd.query(
      `SELECT * FROM ens_evento WHERE Evento_Data BETWEEN '${data_inicial}' AND '${data_final}' ORDER BY Evento_Data`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o evento.',
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

export default new MensagemController();
