from enum import StrEnum, auto


class UpperCaseStrEnum(StrEnum):
	@staticmethod
	def _generate_next_value_(name, start, count, last_values):
		return name.upper()


class Currency(UpperCaseStrEnum):
	USD = auto()
	EUR = auto()
	GBP = auto()
	JPY = auto()

	def __str__(self) -> str:
		return self.name
