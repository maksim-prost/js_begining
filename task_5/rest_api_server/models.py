#модуль создает классы записей в таблиы бд
# каждый класс отвечает за создание собственной таблицы в бд
from app import  db
from datetime import datetime

class UsersSite(db.Model):
	# поля в таблице бд
	id = db.Column(db.Integer, primary_key=True)
	login = db.Column(db.String(50), unique=True)
	eMail = db.Column(db.String(140))
	password = db.Column(db.String(50))
	someParametr = db.Column(db.String(300))
	created = db.Column(db.DateTime, default=datetime.now())

	def __repr__(self):
		return "id:{},login:{},eMail:{},someParametr:{},created:{}]".format(
				self.id,self.login,self.eMail,self.someParametr,self.created)
	def json(self):
		# вернуть необходимые поля для преобразования в json формат 
		return (self.id,self.created,self.login,self.eMail,self.someParametr)
	
	def save(self):
	# cохранит запись в таблице
		db.session.add(self)
		db.session.commit()
