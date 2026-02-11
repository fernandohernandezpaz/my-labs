from enum import StrEnum


class MessageTypesEnum(StrEnum):
	CANINE_BARK_LOUD = 'canine.bark.loud'
	CANINE_TRACK_ACTIVE = 'canine.track.active'
	FELINE_TRACK_SILENT = 'feline.track.silent'
	FELINE_SLEEP_LONG = 'feline.sleep.long'
	ALL_ANIMALS_TRACK_SHORT_TIME = 'all_animal.track.short.time'
