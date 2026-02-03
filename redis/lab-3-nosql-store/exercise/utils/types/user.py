from dataclasses import asdict, dataclass


@dataclass
class User:
	name: str
	level: int
	team: str
	last_login: str

	def dict(self) -> dict[str, str | int]:
		return {k: str(v) for k, v in asdict(self).items()}
