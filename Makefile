all: meetup-slack-integration.tar.xz

meetup-slack-integration.tar.xz:
	docker build . -t meetup-slack-integration:latest
	docker save -o $@ meetup-slack-integration:latest

clean:
	rm -f meetup-slack-integration.tar.xz
