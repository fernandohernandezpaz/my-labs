import asyncio
import httpx
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async

UserModel = get_user_model()


@sync_to_async
def get_recent_users():
	return list(
		UserModel.objects.order_by('-date_joined')[:5].values('username')
	)


def verify_all_responses_ok(responses):
	return all(
		(lambda r: r.status_code == 200)(response) for response in responses
	)


async def async_dashboard_view(request):
	recent_users = await get_recent_users()
	domain = 'https://jsonplaceholder.typicode.com'
	async with httpx.AsyncClient() as client:
		tasks = [
			client.get(f'{domain}/users'),
			client.get(f'{domain}/posts'),
			client.get(f'{domain}/comments'),
		]
		responses = await asyncio.gather(*tasks)

	data = {
		'recent_db_users': [],
		'users': [],
		'posts': [],
		'comments': [],
		'message': '',
	}

	if not verify_all_responses_ok(responses):
		data['message'] = 'Error hitting one of the request'
		return JsonResponse(data=data, status=400)

	users_response, posts_response, comments_response = responses

	data.update(
		{
			'recent_db_users': recent_users,
			'users': users_response.json()[:2],
			'posts': posts_response.json()[:2],
			'comments': comments_response.json()[:2],
			'message': 'Success hitting all the request',
		}
	)
	return JsonResponse(data)
